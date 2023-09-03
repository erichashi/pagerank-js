function pagerank(corpus, damping_factor){
    const len = Object.keys(corpus).length;
    const new_pagerank = {};
    const ranks = {};

        
    Object.entries(corpus).forEach(page => {
        ranks[page[0]] = 1/len;
    });

    const first_condition = (1 - damping_factor)/len;

    
    let dif = 1
    while (dif > 0.001){
        dif = 0

        Object.entries(ranks).forEach( page => {
            let pagename = parseInt(page[0]);

            let iterative_sum = 0.0;

            Object.entries(corpus).forEach( possible => {
                let possiblename = parseInt(possible[0]);
                let possiblelinks = possible[1];
                    

                if(possiblelinks.length===0){
                    iterative_sum += ranks[possiblename] / len;
                } else 
                if(possiblelinks.indexOf(pagename) >= 0 || pagename === possiblelinks){
                    iterative_sum += ranks[possiblename] / possiblelinks.length;
                }

            })

            let second_condition = damping_factor * iterative_sum;

            new_pagerank[pagename] = first_condition + second_condition;
        });


        Object.entries(ranks).forEach( page => {
            let pagename = parseInt(page[0]);

            let previous = ranks[pagename];
            let newrank = new_pagerank[pagename];

            dif += Math.abs(newrank - previous);
            ranks[pagename] = new_pagerank[pagename]
        })
    }
    return ranks
}
