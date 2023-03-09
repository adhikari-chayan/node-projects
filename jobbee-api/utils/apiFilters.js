//https://www.youtube.com/watch?v=efoUO5xZ2W4

class APIFilters{
    constructor(query, queryObj){
        this.query = query;
        this.queryObj = queryObj;
    }

    filterByFields(){
        console.log(this.queryObj);
        const queryObjCopy = {...this.queryObj};
         
        //Removing fields from the query
        const removeFields = ['sort', 'fields', 'q', 'limit', 'page'];
        removeFields.forEach(el => delete queryObjCopy[el]);

        //Advance filter using: lt, lte, gt, gte | adding a $ to the query string as Mongoose needs the filter to be of format {salary: {$gt: '5000'}}
        let queryObjString = JSON.stringify(queryObjCopy);
        queryObjString = queryObjString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);       
       
        this.query = this.query.find(JSON.parse(queryObjString));
        return this;
    }

    sort(){
        if(this.queryObj.sort){
            const sortBy = this.queryObj.sort.split(',').join(' ');
            console.log(sortBy);
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-postingDate');
        }

        return this;
    }

    limitFields(){
        if(this.queryObj.fields){
            const fields = this.queryObj.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else{
            this.query = this.query.select('-__v');
        }
        return this;
    }

    searchByQuery(){
        if(this.queryObj.q){
            const qu = this.queryObj.q.split('-').join(' ');
            this.query = this.query.find({$text: {$search: "\""+ qu +"\""}});
        }

        return this;
    }

    pagination(){
        const page = parseInt(this.queryObj.page, 10) || 1;
        const limit = parseInt(this.queryObj.limit, 10) || 10;
        const skipResults = (page - 1) * limit;

        this.query = this.query
                         .skip(skipResults)
                         .limit(limit);

        return this;
    }
}

module.exports = APIFilters;