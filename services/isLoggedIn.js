module.exports = (req, res, next) => {
    if (!req.user) {
        console.log(`tried authorized action while not logged in`);
        return res.status(401).send({ error: 'Not logged in' });
    }

    next();
};
