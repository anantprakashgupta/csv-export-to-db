var connection = require('../../config/db');

function Todo() {
this.selectGalery = function(req, res, next) {
    var id = req.query.id;
    var toast = req.query.toast;
    if (id != null) {
        detailGalery(req, res, next);
        return;
    }
    connection.acquire(function(err, con) {
        con.query('SELECT * FROM galerys order by modified_at desc', function(err, rows) {
            con.release();
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(JSON.stringify(rows));
                if (toast != null) {
                    if (toast == 'add') {
                        res.render('ulpoad_galery/index', { obj: obj, message: 'Add Data Success' });
                    } else if (toast == 'edit') {
                        res.render('upload_galery/index', { obj: obj, message: 'Update Data Success' });
                    } else {
                        res.render('upload_galery/index', { obj: obj, message: 'Delete Data Success' });
                    }
                } else {
                    res.render('upload_galery/index', { obj: obj, message: null });
                }
            }
        });
    });
};

function detailGalery(req, res, next) {
    var id = req.query.id;
    connection.acquire(function(err, con) {
        if (err) throw err;
        con.query('SELECT * FROM galerys WHERE id = "' + id + '" order by modified_at desc', function(err, rows) {
            con.release();
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(JSON.stringify(rows));
                res.render('upload_galery/view', { obj: obj });
            }
        });
    });
};
}
module.exports = new Todo();