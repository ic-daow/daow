<template>
  <div class="container">
    <div class="columns">
      <div class="column is-9">
        <div class="project-title">{{ projectName }}</div>
        <div class="project-descshort">{{ projectDescShort }}</div>
        <div class="project-img"><img :src="projectPic" :alt="projectName" /></div>
        <div class="project-desc">{{ projectDesc }}</div>
      </div>
      <div class="column is-3">
        <div class="investNum">$192,960</div>
        <b-progress type="is-success" :value="60"></b-progress>
        <div class="investorNum">55</div>
        <div>Reservations & investments</div>
        <div class="leaveDays">87</div>
        <div>Left to invest</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DaoList",
  data() {
    return {
      projectName: "asdf",
      projectDescShort: "asdfasdfasdfasdfasdf",
      projectDesc: `Performing arts organizations of all sizes — from 50-seat playhouses to 3,000+ seat performing arts centers — need ticketing, marketing, fundraising, patron management, and reporting tools to help them manage their growing and complex organizations. The issue is that the majority of solutions on the market are outdated, too expensive, and lack ease-of-use due to failure of adapting to the market's needs after years of little innovation.
As thousands of arts organizations are coming out of a pandemic, they are in need of something that reduces costs, removes complexities in their existing structures, and allows them to rebuild through flexible, easy-to-learn tools.`,
      projectPic:
        "https://uploads.republic.com/p/offerings/card_images/default/000/001/323/1323-1640013134-a7fe1c297ba5d1e1458c202c159f6473cc4bcdb1.jpeg",
    };
  },
};
</script>

<style>
.project-title {
  font-size: 3rem;
  margin: 0 0 1rem 0;
}
.project-descshort{
    margin: 0 0 1rem 0;
}
.project-img{
    margin-bottom: 3rem;
}
.project-img img{
    width:100%
}
.investNum {
  font-size: 3rem;
  color: #19c157;
}
.investorNum{
    font-size: 3rem;
}
.leaveDays{
    font-size: 2rem;
}
</style>
