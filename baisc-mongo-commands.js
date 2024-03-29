// Aggregate to calculate total count of records 
db.student.aggregation([{
    // stage 1
    $count: "Total_records: "
}]);


// count total records 
db.student.count();

// db.student.find({sec:"D"}).pretty()   same as 

db.student.aggregate({
    $match: {
        sec: "D"
    }
});


// grouping with males and females 

db.students.aggregate([
            // stage 1
            {
                $match: {
                    sec: "D"
                },
                // stage 2
                {
                    $group: {
                        _id: "$gender",
                        count_stu: {
                            $sum: 1
                        },
                        {
                            stu_name: ""
                        }
                    }
                ]);



            // group by section name
            // here count_Stu is label 
            db.student.aggregate([{
                $group: {
                    _id: "$sec",
                    count_stu: {
                        $sum: 1
                    }
                }
            }]);

            // sort by section name (ascending)
            db.student.aggregate([{
                $group: {
                    _id: "$sec",
                    count_stu: {
                        $sum: 1
                    }
                },
                {
                    $sort: {
                        sec: 1
                    }
                }
            }]);


            // sort by section name (descending)
            db.student.aggregate([{
                $group: {
                    _id: "$sec",
                    count_stu: {
                        $sum: 1
                    }
                },
                {
                    $sort: {
                        sec: -1
                    }
                }
            }]);


            // sort by count by name (descending)
            db.student.aggregate([{
                $group: {
                    _id: "$sec",
                    count_stu: {
                        $sum: 1
                    }
                },
                {
                    $sort: {
                        count_stu: -1
                    }
                },
                {
                    $limit: 2
                },
                {
                    $skip: 1
                }
            }]);


            // command to save the filtered record in new collection form

            // sort by count by name (descending)
            db.student.aggregate([{
                    $group: {
                        _id: "$sec",
                        count_stu: {
                            $sum: 1
                        }
                    }
                },
                {
                    $out: "NewfilteredCollection"
                }
            ]);

            // it could not group according to the skills 
            // skills is an array of web, python, etc.

            db.skill.aggregate([{
                $group: {
                    _id: "$skills"
                }
            }]);

            // it could not group according to the skills 
            // skills is an array of web, python, etc.
            // unwind break the array

            db.skill.aggregate([{
                    $unwind: "$skill"
                },
                {
                    $group: {
                        _id: "$skills",
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]);
