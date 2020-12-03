const pages = require('./route-title')
module.exports = (() => {

    function generateRoutes(route) {

        let routePackage = []
        route.stack.forEach((layer) => {
            let str = String(layer.regexp).substring(3).replace(/[\\]/gi, '')
            let len = str.length - 5
            let temp = str.substring(0, len)
            // str.substring(3)
            // str.slice(0, -6)

            let title = temp.replace('/admin/', '')
            routePackage.push({ title: '', link: temp })
            // console.log(temp)
        })

        // let pages = ['admin home', 'users', 'admins'] 
        let i = 0
        routePackage.forEach( (obj) => {
            
            if ( i  <= pages.length - 1){
                obj.title = pages[i]

                i++
            }else{
                obj.title = 'TBA'
                i = 0
            }

        })
        console.log(routePackage)

    }

    return generateRoutes

})();