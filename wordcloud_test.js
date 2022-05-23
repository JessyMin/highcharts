var data = [
            {name:'Proration', weight:1000}, 
            {name:'Interline', weight:800}, 
            {name:'Acquisition',weight: 400}, 
            {name:'Sales Audit', weight:300}, 
            {name:'Accounting', weight:200}, 
            {name:'Tax', weight:200}, 
            {name:'Disruption(COP/TRR)', weight:190}, 
            {name:'NGI Auto Reval', weight:180}, 
            {name:'Etsync', weight:170}, 
            {name:'RET22.0', weight:160}, 
            {name:'HOT22.0', weight:150}, 
            {name:'Exchange', weight:140}, 
            {name:'Revalidation', weight:130}, 
            {name:'Terms and Conditions', weight:120}, 
            {name:'Sales Reports', weight:80}, 
            {name:'Coupon Usage and Control', weight:70}, 
            {name:'TRMD', weight:60}, 
            {name:'Issuance', weight:50}, 
            {name:' Enhanced Sales Feed', weight:50}
            ];
/*
var data = [
    {name:'Proration', weight:9}, 
    {name:'Interline', weight:11}, 
    {name:'Acquisition',weight: 1}, 
    {name:'Sales Audit', weight:10}, 
    {name:'Accounting', weight:2}, 
    {name:'Tax', weight:13}, 
    {name:'Disruption(COP/TRR)', weight:5}, 
    {name:'NGI Auto Reval', weight:9}, 
    {name:'Etsync', weight:15}, 
    {name:'RET22.0', weight:19}, 
    {name:'HOT22.0', weight:16}, 
    {name:'Exchange', weight:12}, 
    {name:'Revalidation', weight:4}, 
    {name:'Terms and Conditions', weight:14}, 
    {name:'Sales Reports', weight:6}, 
    {name:'Coupon Usage and Control', weight:3}, 
    {name:'TRMD', weight:18}, 
    {name:'Issuance', weight:7}, 
    {name:' Enhanced Sales Feed', weight:17}
    ];
*/

for (var i = 0; i < data.length; i++) {
    if (data[i].weight < 5) {
    data[i].color = '#ABC7CA'
    data[i].opacity = 0.6
        } 
    else if (data[i].weight < 10) {
    data[i].color = '#79B3B4'
        } 
    else if (data[i].weight < 15) {
    data[i].color = '#153030'
    data[i].opacity = 0.8
        } 
    else {
    data[i].color = '#ED561B'
        }  
    }

    /*
    투명도 넣기
    */
    var makeScale = function (domain, range) {
        var minDomain = domain[0];
        var maxDomain = domain[1];
        var rangeStart = range[0];
        var rangeEnd = range[1];
    
        return (value) => {
            return rangeStart + (rangeEnd - rangeStart) * ((value - minDomain) / (maxDomain - minDomain));
        }
    };
    /**
     * Find min and max weight using reduce on data array
     */
    var minWeight = data.reduce((min, word) =>
        (word.weight < min ? word.weight : min),
        data[0].weight
    );
    var maxWeight = data.reduce((max, word) =>
        (word.weight > max ? word.weight : max),
        data[0].weight
    );
    var scale = makeScale([minWeight, maxWeight], [0.7, 1]);
    /**
     * creating a new, scaled data array
     */
    var scaledData = data.map(word =>
        ({ name: word.name, weight: word.weight, color: `rgba(60,170,200,${scale(word.weight)})` })
    );




/* 워드클라우드 그리기 */
Highcharts.chart('container', {
		chart: {
        backgroundColor: '#F2F2F2'
    },
    series: [{
        type: 'wordcloud',
        placementStrategy: 'center',
        data: scaledData,
        rotation: {
            from: 0,
            to: 0
        },
        colors: ["#ABC7CA", '#79B3B4', '#153030', '#ED561B'],
        minFontSize: 3,
        maxFontSize: 15,
        allowPointSelect: true,
        point: {
            events: {
                click: function () {
                    location.href = 'https://en.wikipedia.org/wiki/' +
                        this.options.key;
                }
            }
        },
        style: {
		        fontFamily: 'sans-serif', fontWeight: 900
	    },
        states: {
            hover: {color: "#153030"},
            select: {
                borderColor: "#153030", color: "#153030"
            }
        },
        name: 'Occurrences'
    }],
    title: {
        text: 'WordCloud Test'
    }
});