const dateFormatter = {
    formatYMD: date => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0') // 01–12
        const day = String(date.getDate()).padStart(2, '0') // 01–31
        return `${year}-${month}-${day}`
    },

    formatFdY: date => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    },

    formatDateTime: date => {
        const ymd = dateFormatter.formatYMD(date)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${ymd} ${hours}:${minutes}`
    },

    getCurrentTrimester: () => {
        const now = new Date()
        const month = now.getMonth() + 1
        const year = now.getFullYear()

        let trimester, startMonth, endMonth

        if (month <= 3) {
            trimester = 1
            startMonth = 0
            endMonth = 2
        } else if (month <= 6) {
            trimester = 2
            startMonth = 3
            endMonth = 5
        } else if (month <= 9) {
            trimester = 3
            startMonth = 6
            endMonth = 8
        } else {
            trimester = 4
            startMonth = 9
            endMonth = 11
        }

        const startDate = new Date(year, startMonth, 1)
        const endDate = new Date(year, endMonth + 1, 0)

        return {
            trimester,
            start: dateFormatter.formatYMD(startDate),
            end: dateFormatter.formatYMD(endDate),
        }
    },
}

export default dateFormatter
