module.exports = (() => {
    const mysql = require('mysql')
    var team = []
    var leaders=[]
    var numberofteams;
    const connection = mysql.createConnection({ //seems the only way below code works if this is here the above code gives errors
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'lunch4four'
    });
    
    connection.connect(function(err) {
      if (err) throw err;
      //gets the users who are active into a query. 
      connection.query("SELECT username, email FROM accounts where active =1 and admin =0", function (err, result, fields) {
        if (err) throw err;
        let numberofteams = result.length;
        
        for(let i=0;i<result.length;i++){ //just prints out the users.
            //console.log(result[i].username)
            //console.log(numberofteams+"number of teams")
            team.push(result[i].username)
        }

       // console.log(team)
         for(let i=0;i<result.length;i++){ //just prints out the users.
            console.log(team[i]) 
        }

      });
     
    

     
     connection.query("Select * from team",function(err,result,fields){
        shuffle(team)
        console.log(team)
        
        console.log(Math.ceil(team.length/4))

        for(let i =0;i<Math.ceil(team.length/4);i++){
         var sql = "INSERT INTO team (Team_id,leader) VALUES ('"+(i+1)+"','"+team[i]+"')"; //select the first 4 from the array as the leaders which the team is random
         connection.query(sql, function (err, result) {
           if (err) throw err;
           console.log("1 record inserted");
         });
        }


         connection.end();
     });

    
    });
    

    })();

    // shuffles the array of teams to randomize it
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        
        while (0 !== currentIndex) {
      
   
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    
    