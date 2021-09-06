const widing = (date) => {
    const year = date.getFullYear(), month = date.getMonth() + 1;
    const day = date.getDate();
    const w = date, result = [];

    while(w.getDate() > 1) w.setDate(w.getDate() - 1);
    while(w.getMonth() + 1 === month){
        const week = [];
        for(let i=0; i<7; i++){
            if(w.getMonth() + 1 === month && w.getDay() === i){
                let available = null;
                if(w.getDate() === day) available = 'today';
                if(w.getDate() > day) available = true;
                week.push({ date: w.getDate(), available: available });
                w.setDate(w.getDate() + 1);
            }
            else{
                week.push({ date: null });
            }
        }
        result.push(week);
    }
    return result;
}

const get = () => {
    const today = new Date();
    const currentMonth = widing(today);
    return currentMonth;
}

const getDateInfo = { get }
export default getDateInfo;