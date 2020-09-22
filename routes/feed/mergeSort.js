function mergeSort(array)
{   
  const Sorting=(subArray)=>{
   if(subArray.length==1)
     {
        return subArray
     }
   let mid = Math.floor(subArray.length/2)
    let A= mergeSort(subArray.splice(mid))
    let B=mergeSort(subArray)
    let C =Merge(A,B)
   return C
  }
  return Sorting(array)
}

function Merge(array1,array2)
{
   let merged=[]
   let num=0
   let index1=0,index2=0
   let len1=array1.length
   let len2=array2.length
while(index1+index2<len1+len2)
{
   if(array2[index2].date<array1[index1].date)
   {
     merged.push(array2[index2])
      index2++
   }
   else if (array2[index2].date>=array1[index1].date)
   {
      merged.push(array1[index1])
      index1++
   }
   else
   {
    for(num=index1;num<len1;num++)
    {
      if(array1[num])
      {
        merged.push(array1[num])
      }
      else{
        break
      }
    }
    for(num=index2;num<len2;num++)
    {
      if(array2[num])
      {
        merged.push(array2[num])
      }
      else{
        break
      }
    }
     return merged
   }
}
return merged
}

module.exports=mergeSort