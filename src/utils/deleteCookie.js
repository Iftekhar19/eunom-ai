const deleteCookie=async()=>
{
try {
        await fetch("/api/logout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
 
});
    
} catch (error) {
    console.log(error)
}

}
export {deleteCookie}