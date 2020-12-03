let updateActivity  =  (id_list = [], activity_list) => {
    console.log(id_list, activity_list)

    let formated = []
    let count = 0
    id_list.forEach((id) => {
        formated.push({id : id, active : activity_list[count]})
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