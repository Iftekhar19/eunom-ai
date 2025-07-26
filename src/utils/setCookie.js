const setCookie=async(idToken)=>
{
try {
        await fetch("/api/session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ idToken }),
});
    
} catch (error) {
    console.log(error)
}

}
export {setCookie}