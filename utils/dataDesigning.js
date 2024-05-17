const dataDesigning = (bot, msg, rawData,city) => {
    const { time, temperature_2m, relative_humidity_2m, wind_speed_10m } = rawData.hourly

    function dataMapping(time, temp, humid, wind) {
        if (time.length === temp.length && humid.length === wind.length) {
            const mappedData = []
            for (let i = 0; i < time.length; i++) {
                let info = {}
                info.time = time[i]
                info.temp = temp[i]
                info.humid = humid[i]
                info.wind = wind[i]
                mappedData[i] = info
            }
            const newDate = msg.date.length === 10?new Date(msg.date * 1000):new Date(msg.date)
            const hrs = newDate.getHours()
            let currWeatherdata
            for (i in mappedData) {
                if (mappedData[i].time.includes(hrs)) {
                    const {temp,humid,wind}=mappedData[i]
                    bot.sendMessage(msg.from.id,`WEATHER FORECAST\nLOCATION: ${city}\nTEMP: ${temp}\nHUMIDITY: ${humid}\nWIND SPEED: ${wind}`)
                    console.log((msg.from.id,`WEATHER FORECAST\nLOCATION: ${city}\nTEMP: ${temp}\nHUMIDITY: ${humid}\nWIND SPEED: ${wind}`))
                    break
                }
            }
        }
    }
    dataMapping(time, temperature_2m, relative_humidity_2m, wind_speed_10m)
}

module.exports = dataDesigning