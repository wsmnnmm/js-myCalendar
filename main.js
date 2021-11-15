let currentTime = new Date()
render(currentTime)

g('#prevMonth').onclick = () => {
    const 月初 = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
    render(new Date(月初 - 86400 * 1000))
}
g('#nextMonth').onclick = () => {
    const 下月初 = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1)
    render(new Date(currentTime - 0 + 86400 * 1000 * 30))
}
g('#today').onclick = () => {
    render(new Date())
}

// 帮助函数
function g(selector) {
    return document.querySelector(selector)
}
function gs(selector) {
    return document.querySelectorAll(selector)
}
function render(time) {

    const year = time.getFullYear()
    const month = time.getMonth() + 1

    initTime()
    generateDays()
    currentTime = time
    // 帮助函数
    function initTime() {
        const time = g('#time')
        time.textContent = `${year}年${month}月`
    }
    function generateDays() {
        //days
        const 月初 = new Date(year, month - 1, 1)
        const 月初星期几 = 月初.getDay()
        const 月末 = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
        const 月末几号 = 月末.getDate()
        const 这个月多少天 = 月末几号
        const liList = []
        const days = g('#days')
        days.innerHTML = ""
        let n = 0
        // 铺垫
        for (let i = 1; i < 月初星期几; i++) {
            const li = document.createElement('li')
            const d = new Date(月初 - 86400 * 1000 * i)
            li.textContent = d.getDate()
            days.prepend(li)
            li.classList.add('calendar-days-disabled')
            n += 1
        }

        const now = new Date()
        let selectedLi = null
        for (let i = 1; i <= 这个月多少天; i++) {
            const li = document.createElement('li')
            li.textContent = i
            console.log(i)
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                li.classList.add("calendar-days-today")
            }
            li.onclick = () => {
                if (selectedLi) { selectedLi.classList.remove('calendar-days-selected') }
                li.classList.add("calendar-days-selected")
                selectedLi = li
            }
            days.append(li)
            n += 1
        }
        //铺垫
        const 月末星期几 = 月末.getDay()
        let i = 月末星期几 + 1
        for (let j = 0; j < 42 - n; j++) {
            const date = i - 月末星期几
            const li = document.createElement('li')
            const d = new Date(月末 - 0 + 86400 * 1000 * date)
            li.textContent = d.getDate()
            days.append(li)
            li.classList.add('calendar-days-disabled')
            i++
        }
    }
}