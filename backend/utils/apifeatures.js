class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {

        // if there is keyword i.e. we trying to search by name of the product then we are handling it here by creating 
        // the respective keyword for it 


        // const searchparameter = [];
        // if(this.queryStr.from){
        //     searchparameter.push({from:{$regex:this.queryStr.from}})
        // }
        // if(this.queryStr.to){
        //     searchparameter.push({to:{$regex:this.queryStr.to}})
        // }


        // if(this.queryStr._id){
        //     searchparameter.push({_id:{$regex:this.queryStr._id}})
        // }
        
        // const keyword = this.queryStr.keyword ? {
        //     $or:[
        //         {name: {
        //             $regex: this.queryStr.keyword,
        //         }},
        //         {from:{
        //             $regex:this.queryStr.from,
        //         }},
        //         {to:{
        //             $regex:this.queryStr.to,
        //         }},{
        //             orderStatus:"Accepted"
        //         }
        //     ]

        // } : {}
        // console.log(searchparameter);
        // if(this.queryStr.keyword && this.queryStr.keyword.length==24)
        // this.query = this.query.find({_id:this.queryStr.keyword});
        // else
        
        if(this.queryStr.keyword && this.queryStr.keyword.length==24)
        this.query = this.query.find({
            $or:[
                {to:{$regex:this.queryStr.keyword}},
                {from:{$regex:this.queryStr.keyword}},
                {_id:this.queryStr.keyword}
            ]
        });
        else if(this.queryStr.keyword)
        this.query = this.query.find({
            $or:[
                {to:{$regex:this.queryStr.keyword}},
                {from:{$regex:this.queryStr.keyword}}
            ]
        });
        return this;
    }

    // used to filter category 

    filter() {

        // if we are tyring to filter out the category for eg. find the category laptop then 
        // we first make a copy of all the query parameters given which is querystr and remove keywords and page from it 
        // and simple give it to the find i.e.P category : laptop }
        const queryCopy = { ...this.queryStr };  // done this way because this will not give value by reference


        //Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key])

        // Filter for price and rating
        // if there is something like category : laptop then it will be done properly but if there is something like price greater than ...
        // then we need 
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;