export const BASE_URL = 'https://newsapi.org/v2'

export const APIKEY = '65c07391db9d4a689e195f83dc1144bd';

export function constructDate(date){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const initial = new Date(date);
    let constructedDate = initial.getDay() + ' ' + monthNames[initial.getMonth()];
    if(constructedDate){
        return constructedDate;
    }else{
        return '';
    } 
}

export function constructTime(date){
    const initial = new Date(date);
    let constructedDate = initial.toLocaleString();
    if(constructedDate){
        return constructedDate.split(',')[1].slice(0,6);
    }else{
        return '';
    } 
}