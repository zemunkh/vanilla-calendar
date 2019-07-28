var vanillaCalendar = {
  month: document.querySelectorAll('[data-calendar-area="month"]')[0],
  next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
  previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
  label: document.querySelectorAll('[data-calendar-label="month"]')[0],

  activeDates: null,
  date: new Date(),
  todaysDate: new Date(),

  init: function (options) {
    this.options = options
    this.date.setDate(1)
    this.createWeek(0)
    this.createListeners()
  },

  createListeners: function () {
    var _this = this


    this.next.addEventListener('click', function () {
      var weekNum = 0;
      var day = _this.date.getDate()
      _this.date.setDate(day)

      console.log("First Day of the next week is: " + day + " Month is " + _this.date.getMonth())
      var n = day/7
      var dec_portion = Math.floor(n);
      var rem_portion = n - Math.floor(n)
      if(rem_portion === 0) {
        var weekNum = dec_portion;
        console.log("Week #" + weekNum)
      } else {
        var weekNum = dec_portion + 1;
        console.log("Week #" + weekNum)
      }

      _this.clearCalendar()
      _this.createWeek(weekNum)
    })
    // Clears the calendar and shows the previous week
    this.previous.addEventListener('click', function () {
      var weekNum = 0;
      var day = _this.date.getDate() - 14
      _this.date.setDate(day)

      day = _this.date.getDate()
      console.log("First Day of the last week is: " + day + " Month is " + _this.date.getMonth())
      var n = day/7
      var dec_portion = Math.floor(n);
      var rem_portion = n - Math.floor(n)
      if(rem_portion === 0) {
        var weekNum = dec_portion;
        console.log("Week #" + weekNum)
      } else {
        var weekNum = dec_portion + 1;
        console.log("Week #" + weekNum)
      }

      _this.clearCalendar()
      _this.createWeek(weekNum)
    })
  },

  createDay: function (num, day, year) {
    var newDay = document.createElement('div')
    var dateEl = document.createElement('span')
    dateEl.innerHTML = num
    newDay.className = 'vcal-date'
    newDay.setAttribute('data-calendar-date', this.date)


    if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
      newDay.classList.add('vcal-date--disabled')
    } else {
      newDay.classList.add('vcal-date--active')
      newDay.setAttribute('data-calendar-status', 'active')
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add('vcal-date--today')
    }

    newDay.appendChild(dateEl)
    this.month.appendChild(newDay)
  },

  dateClicked: function () {
    var _this = this
    this.activeDates = document.querySelectorAll(
      '[data-calendar-status="active"]'
    )

    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].addEventListener('click', function (event) {
        var picked = document.querySelectorAll(
          '[data-calendar-label="picked"]'
        )[0]

        _this.createTime()

        picked.innerHTML = this.dataset.calendarDate
        _this.removeActiveClass()
        this.classList.add('vcal-date--selected')
      })
    }
  },

  createWeek: function (weekNum) {
    var week = 0
    if (weekNum === 0) {
      var day = this.todaysDate.getDate()
      var n = day/7
      var dec_portion = Math.floor(n);
      var rem_portion = n - Math.floor(n)
      if(rem_portion === 0) {
        var week = dec_portion;
        console.log("Week #" + week)
      } else {
        var week = dec_portion + 1;
        console.log("Week #" + week)
      }
      if(this.todaysDate.getDay() === 0) {
        this.date.setDate(day - 6)
      } else {
        this.date.setDate(day - this.todaysDate.getDay() + 1)
      }
      console.log("The first day of the week #" + this.date.getDate())
      weekNum = week
    } else {
      var day = this.date.getDate()
      var n = day/7
      var dec_portion = Math.floor(n);
      var rem_portion = n - Math.floor(n)
      if(rem_portion === 0) {
        var week = dec_portion;
        console.log("Week #" + week)
      } else {
        var week = dec_portion + 1;
        console.log("Week #" + week)
      }
    }

    var currentMonth = this.date.getMonth()
    while (weekNum === week) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getFullYear(),
      )
      if (this.date.getDay() === 0) {
        // this.date.setDate(7*week + 1)
        this.date.setDate((this.date.getDate() + 1))
        console.log("Week : " + week + " -- Days: " + (7*week + 1))
        week++
      } else {
        this.date.setDate(this.date.getDate() + 1)
      }
    }

    this.label.innerHTML =
      this.monthsAsString(this.date.getMonth()) + (this.date.getDate())
      + ',  ' + this.weekdaysAsString(this.date.getDay())

    this.dateClicked()
  },

  monthsAsString: function (monthIndex) {
    return [
      'I-',
      'II-',
      'III-',
      'IV-',
      'V-',
      'VI-',
      'VII-',
      'VIII-',
      'IX-',
      'X-',
      'XI-',
      'XII-'
    ][monthIndex]
  },

  monthsAsString: function (monthIndex) {
    return [
      'January',
      'Febuary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][monthIndex]
  },

  clearCalendar: function () {
    vanillaCalendar.month.innerHTML = ''
  },

  removeActiveClass: function () {
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove('vcal-date--selected')
    }
  }
}
