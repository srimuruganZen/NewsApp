export const BASE_URL = 'https://newsapi.org/v2'

export const APIKEY = '65c07391db9d4a689e195f83dc1144bd';

export function constructDate(date){
    if(date){
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
}

export function constructTime(date){
    if(date){
        const initial = new Date(date);
        let constructedDate = initial.toLocaleTimeString();
        if(constructedDate){
            let time = constructedDate.slice(0,5);
                return time;
            }
        }else{
            return '';
        } 
}