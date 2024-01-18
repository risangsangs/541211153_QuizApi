const db = require('../models');
const quiz = require('../models/quiz');
const Quiz = db.quizzes;

//CREATE: add data to table quiz
exports.create = async (req, res) => {

    try {
        const data = await Quiz.create(req.body)
        res.json({
            message: 'quiz created successfuly.',
            data: data,
        })
    } catch(error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

// READ: Get All data on table quiz
exports.getAll = async(req, res) => {
    try{
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes retrieved successfully",
            data: quizzes,
        });
    } catch(error){
        res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

// UPDATE: Update data on table quiz using id
exports.update = async(req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        
        quiz.update(req.body, {
            where: {id}
        })

        res.json({
            message: 'Quizzes updated successfully.',
            data: quiz,
        });
    } catch(error) {
        if(error.name === 'SequelizeEmptyResultError') {
            res.status(404).json({
                message: 'Quiz Not Found',
                data: null,
            });
        } else {
            res.status(500).json({
                message: error.message || 'Some error accurred while retrieving quiz',
                data: null,
            });
        }
    }
};

// DELETE: Delete data on table quiz using id
exports.delete = async(req, res) => {
    const id = req.params.id
    try{
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })

        quiz.destroy()

        res.json({
            message: 'Quiz deleted successfully.'
        });
    } catch(error) {
        res.status(500).json({
            message: error.message || 'Some error accurred while retrieving quiz',
            data: null,
        });
    }
};

// FINDONE : Get by id data on table quiz
exports.findOne = async(req, res) => {
    const id = req.params.id
    try{
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `Quizzes retrieved successfully with id=${id}`,
            data: quiz,
        });
    }catch(error) {
        res.status(500).json({
            message: error.message || 'Some error accurred while retrieving quiz',
            data: null
        });
    }
};

// GETBYCATEGORYID : Get All data quiz on category
exports.getByCategoryId = async(req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            categoryId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with categoryId=${id}.`,
        data: quizzes,
    });
}

// GETBYLEVELID : Get All data quiz on level
exports.getByLevelId = async(req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            levelId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with levelId=${id}.`,
        data: quizzes
    });
}