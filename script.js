const get_data =async url =>{
    try {
        const response =await fetch(url);
        const data =await response.json(); 
        return data;
    } catch ({message}) {console.log(message);}
}


const get_suggestions =async q =>{
    const services =await get_data("http://127.0.0.1:5501/app/data.json"); 
    const suggestions =[]; 
    const matched =[...services].filter(({service}) =>  service.toLowerCase().includes(q.toLowerCase()));
    matched.join(',')
    matched.forEach(({service}) =>!suggestions.join(',').includes(service)?suggestions.push(service): null); 
    return suggestions 
} 
 
const suggest =async ({value}) =>{
    let suggestions ='';
    if(value){ 
        const items =await get_suggestions(value);
        [...items].forEach(suggestion =>suggestions  =`${suggestions}<li onclick ="select(this)">${suggestion}</li>`); 
    }
    document.getElementById('suggestions').innerHTML =suggestions; 
} 

const select = self =>{
    const value =self.textContent;
    const searchField =self.parentNode.parentNode.q; 
    searchField.value =value;
    document.getElementById('suggestions').innerHTML ='';
}