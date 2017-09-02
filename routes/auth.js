const express = require("express");
const passport = require('passport');
const multer = require("multer");
const path = require("path");

const editor = path.resolve(__dirname, "../editor.js");

const User = require("../models/user");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, file.fieldname + "-" + Date.now() + "." + ext);
    }
});
const upload = multer({storage: storage}).single('avatar');

router.get('/login', (req, res) => {
    if (req.user) {
        res.send(req.user.getJSON());
    } else {
        res.status(401).send({error: req.flash('error')});
    }
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

router.post('/register', (req, res) => {
    User.register(User.createFromJSON(req.body), req.body.password, (err, user, next) => {
        if (err) {
          return res.status(400).send({error: err.message});
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/login');
            });
        });
    });
});

router.use((req, res, next) => {
    if (!req.user) {
        let err = new Error("Not authorized");
        err.status = 401;
        return next(err);
    }
    next();
});

router.post('/settings', (req, res, next) => {
    const user = req.user;

    upload(req, res, (err) => {
        if (err) {
            return next(err);
        }

        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;

        if (req.file) {
            user.setAvatar(req.file.filename);

            const childProcess = require("child_process").fork(editor);

            childProcess.on('error', (err) => {
                return next(err);
            });

            childProcess.send(req.file.path);
        }

        const promise = new Promise((resolve, reject) => {
            if (req.body.newpassword) {
                user.changePassword(req.body.password, req.body.newpassword, (err) => {
                    if (err) {
                        return reject(err);
                    }

                    user.save().then(() => {
                        resolve(user.getJSON());
                    }, (err) => {
                        return reject(err);
                    });
                });
            } else {
                user.save().then(() => {
                    resolve(user.getJSON());
                }, (err) => {
                    return reject(err);
                });
            }
        });

        promise.then((result) => {
            res.send(result);
        }, (err) => {
            next(err);
        });
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

module.exports = router;
