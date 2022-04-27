
pub struct Page<T> {
    data: Vec<T>,
    page_size: u8,
    page_num: u8,
    total_count: u64,
}