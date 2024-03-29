import  _ from 'lodash';

// ***** geeting all tyoes of data into single array with thire sum **********************************
export function getSum(transaction, type){
    let sum = _(transaction)
                      .groupBy("type")
                      .map((objs, key) => {
                        if(!type) return _.sumBy(objs, 'amount'); // [300, 350, 500]
                        return {
                            'type' : key,
                            'color' : objs[0].color,
                            'total' : _.sumBy(objs, 'amount')   
                        }
                      })
                      .value()
    return sum;
}

// ******** calculationg the percentage for lables ***********************************************
export function getLabels(transaction){
    let amountSum = getSum(transaction, 'type');
    let Total = _.sum(getSum(transaction));

    let  percent = _(amountSum)
                            .map(objs => _.assign(objs, { percent : (100 * objs.total)  / Total}))
                            .value()

    return percent;
}

// ******* danaught charts values setup **********************************************************
export function chart_Data(transaction, custom){

    let bg = _.map(transaction, a => a.color)
    bg = _.uniq(bg)
    let dataValue = getSum(transaction)

    const config = {
        data : {
          datasets: [{
              data: dataValue,
              backgroundColor: bg,
              hoverOffset: 4,
              borderRadius : 30,
              spacing: 10
            }]
        },
        options : {
            cutout: 115
        }
    }

    return custom ?? config;

}

// ***** calculating the total sum *****************************************************************
export function getTotal(transaction){
    return _.sum(getSum(transaction)) - total(transaction) ;
}

// ***** expemce will be substracted form total sum used function if needed *************************
export function total(transaction){

    const total = [0,0,0]  //icome, invesment, expense
    console.log(total);

    for(let val=0; val < transaction.length; val++){
        const values = Object.values(transaction[val])
        console.log(values);
        console.log(values[2]);

        if(values[2] === "Income"){
            total[0]+=values[3]
        }
        else if(values[2] === "Investment"){
            total[1]+=values[3]
        }
        else{
            total[2]+=values[3]
        }
    }
    
    return total[2]*2
}
