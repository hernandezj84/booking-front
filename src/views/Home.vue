<template>
  <div class="container my-5">
    <div class="row p-4 pb-0 align-items-center rounded-3 border shadow-lg">
      <table class="table table-bordered vh-50">
        <thead>
          <tr id="monthHeader">
            <th colspan="8" id="header" class="text-center">
              <span v-if="counter > 0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  fill="currentColor"
                  class="bi bi-arrow-left-square"
                  id="prev"
                  viewBox="0 0 16 16"
                  @click="move('backwards')"
                  style="cursor: pointer"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </span>

              <h4 class="d-inline-block align-middle p-2" id="week">
                From: {{ sun }} To: {{ sat }}
              </h4>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  fill="currentColor"
                  class="bi bi-arrow-right-square"
                  id="next"
                  viewBox="0 0 16 16"
                  @click="move('forward')"
                  style="cursor: pointer"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
              </span>
            </th>
          </tr>

          <tr class="text-center" id="weekHeader">
            <th
              class="headerDay"
              v-for="(d, dayIndex) in [sun, mon, tues, wed, thur, fri, sat]"
              :key="dayIndex"
            >
              {{ d }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, timeIndex) in times" :key="timeIndex">
            <td
              v-for="(d, dayIndex) in [sun, mon, tues, wed, thur, fri, sat]"
              :id="dayIndex + timeIndex"
              :key="dayIndex"
              :class="checkClass(t, d)"
              @click="selectDate(t, d)"
            >
              {{ t[0] }} to {{ t[1] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <button
      class="btn btn-primary"
      data-bs-target="#collapseTarget"
      data-bs-toggle="collapse"
      @click="test1()"
    >
      Bootstrap collapse
    </button>
    <div class="collapse py-2" id="collapseTarget">
      This is the toggle-able content! {{ now }}
    </div> -->
  </div>
  <!-- MODAL  -->
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    @click="load()"
  >
    Launch demo modal
  </button>

  <!-- Modal -->
  <wait-modal :is-loading="isLoading"></wait-modal>
</template>
<style>
td {
  cursor: pointer;
}
</style>
<script>
import moment from "moment";
export default {
  computed: {},
  data() {
    return {
      dateFormat: "dddd D MMM, YYYY",
      sun: "",
      mon: "",
      tues: "",
      wed: "",
      thur: "",
      fri: "",
      sat: "",
      counter: 0,
      baseTime: moment("1970-01-01 06:00"),
      timeFormat: "h:mm A",
      timeFormat2: "HH:mm",
      times: [],
      user: "user1",
      selections: [],
      isLoading: false,
    };
  },
  methods: {
    changeDaysForward() {
      let days = Math.abs(this.counter * 6);
      let base = moment().add(days, "days").startOf("week");
      this.changeDays(base);
    },
    changeDaysBackwards() {
      let days = Math.abs(this.counter * 6);
      let base = moment().subtract(days, "days").startOf("week");
      this.changeDays(base);
    },
    changeDays(base) {
      this.sun = base.format(this.dateFormat);
      this.mon = base.add(1, "days").format(this.dateFormat);
      this.tues = base.add(1, "days").format(this.dateFormat);
      this.wed = base.add(1, "days").format(this.dateFormat);
      this.thur = base.add(1, "days").format(this.dateFormat);
      this.fri = base.add(1, "days").format(this.dateFormat);
      this.sat = base.add(1, "days").format(this.dateFormat);
    },
    move(movement) {
      if (movement == "forward") {
        this.counter = this.counter + 1;
        this.changeDaysForward();
      } else if (movement == "backwards") {
        this.counter = this.counter - 1;
        this.changeDaysBackwards();
      } else if (movement == "today") {
        this.counter = 0;
        this.changeDaysForward();
      }
    },
    createTime() {
      this.times = [];
      for (let i = 1; i <= 24; i++) {
        this.times.push([
          this.baseTime.format(this.timeFormat),
          this.baseTime.add(1, "hour").format(this.timeFormat),
        ]);
      }
    },
    selectDate(timeBlock, day) {
      let d = moment(day, this.dateFormat);
      let tB = timeBlock[0];
      let t = moment("1970-01-01 " + tB, "YYYY-MM-DD" + this.timeFormat);
      // console.log(
      //   "HELLO",
      //   timeIndex,
      //   timeBlock,
      //   day,
      //   dayIndex,
      //   d,
      //   t.format(this.timeFormat2),
      //   t.hours(),
      //   d.format("YYYY-MM-DD")
      // );
      let dateSelected = `${d.format("YYYY-MM-DD")}_${t.hours()}`;
      if (this.selections.includes(dateSelected)) {
        const index = this.selections.indexOf(dateSelected);
        this.selections.splice(index, 1);
      } else {
        this.selections.push(dateSelected);
      }
      console.log("HELLO", this.selections);
    },
    checkClass(timeMoment, dateMoment) {
      let tdClass = "small";
      let tb = timeMoment[0];
      let currentTime = moment(
        "1970-01-01 " + tb,
        "YYYY-MM-DD" + this.timeFormat
      );
      let currentDate = moment(dateMoment, this.dateFormat);
      // time.hours()
      if (
        this.selections.includes(
          currentDate.format("YYYY-MM-DD") + "_" + currentTime.hours()
        )
      ) {
        tdClass = tdClass + " table-warning";
      }
      return tdClass;
    },
    load() {
      this.isLoading = !this.isLoading;
    },
  },
  mounted() {
    this.createTime();
    this.move("today");
  },
};
//  var startOfWeek = moment().startOf("week").format("dddd D MMM, YYYY");
//           var endOfWeek = moment().endOf("week").format("dddd D MMM, YYYY");
</script>


