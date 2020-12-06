let updateActivity  =  (id_list = [], activity_list) => {
    console.log(id_list, activity_list)
    let temp = []
    for(let i = 0; i < activity_list.length; i += 2){
        console.log(i,activity_list[i])
        if(activity_list[i] === '1'){
            temp.push(activity_list[i])
            // i++
        }else if (activity_list[i] === '0'){
            temp.push(activity_list[i])
            i--
        }
    }
    console.log('Temp:', temp)
    // activity_list

    let formated = []
    let count = 0

    id_list.forEach((id) => {
        formated.push({id : id, active : temp[count]})
        count++
    })

    return formated

    // let count = 0
    // id_list.forEach((id) => {
    //     console.log(activity_list[count])
    //     await AccountModel.update({ active : activity_list[count]}, id)
    //     count ++
    // })
}

module.exports = updateActivity