async function disconnectedOrLoggedOut({email,io,people}){
    for(i=0;i<people.length;i++)
        {
            if(people[i].email==email && people[i].frequency>0 )
            {
                people[i].frequency=people[i].frequency-1
            }
        }
        people = people.filter(elem=>elem.frequency!=0)
        
        io.emit("GET_USER",people)
        io.emit("NEW_USER",people.length)
        return people
}
async function newTabOrLoggedIn({email,io,people}){
    let existing = false
    for(i=0;i<people.length;i++)
    {
        if(people[i].email==email)
        {
            existing=true
            people[i].frequency=people[i].frequency+1
        }
    }
    if(!existing)
    {
        people.push({email,frequency:1})
    }
    people=people.map(elem=>elem.frequency!==0?elem:null).filter(elem=>elem)
    io.emit("NEW_USER",people.length)
    io.emit('GET_USER',people)
    return people
}
module.exports={disconnectedOrLoggedOut,newTabOrLoggedIn}