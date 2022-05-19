const url = "https://gorest.co.in/public/v1/users";
const bearer = "Token: d7c01847de4c083cb154e9a533294301e9f05f93dbae7d589e42ece63226c0a3";

async function getData() {
    const respData = await fetch(url, {
        method: "GET",
        withCredentials: true,
        credentials: "same-origin",
        headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
        },
    });
    const data = await respData.json();
    console.log(data.data);
}

getData();
