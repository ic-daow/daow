fn main() -> Result<(), Box<dyn std::error::Error>> {
    use std::{env, fs, path};
    use candid::{bindings, check_prog, IDLProg, TypeEnv};

    let did_path = env::args().nth(1).unwrap();
    let did_path = path::Path::new(did_path.as_str());

    let base_path = "src/binding/lib/actor";
    let file_name = did_path.file_name().unwrap();
    let file_name = file_name.to_str().unwrap();

    let prog = fs::read_to_string(did_path)?;
    let ast = prog.parse::<IDLProg>()?;
    let mut env = TypeEnv::new();
    let actor = check_prog(&mut env, &ast)?;

    let js = bindings::javascript::compile(&env, &actor);
    fs::write(format!("{}/{}.js", base_path, file_name), js)?;

    let ts = bindings::typescript::compile(&env, &actor);
    let ts_polyfill = r#"
import type { IDL } from '@dfinity/candid';
export const idlFactory: IDL;"#;
    let ts = format!("{}{}", ts, ts_polyfill);
    fs::write(format!("{}/{}.d.ts", base_path, file_name), ts)?;

    fs::copy(did_path, format!("{}/{}", base_path, file_name))?;

    Ok(())
}
