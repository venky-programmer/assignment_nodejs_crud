import mysql from 'mysql'

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "mysql password",
  database: "db name"
});

class customerController {
  //Show the page with mysql data
  static renderPage = (req, res) => {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err; //DB not successfully connected
        console.log("DB successfully connected with ID " + connection.threadId);

        //User the connection
        connection.query('SELECT * FROM customer_data', (err, rows) => {

          //when done with connection, send the data
          connection.release();
          if (!err) {
            let deleteCus = req.query.removed;

            //Page rendering
            res.render('home', { rows, deleteCus });
          } else {
            console.log(err);
          }
          // console.log(`Data from customer_data ${JSON.stringify(rows)}`);
        })
      });
    } catch (error) {
      console.log(error)
    }
  }

  //Find customer by search
  static findCustomer = (req, res) => {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err; //DB not successfully connected
        console.log("DB successfully connected with ID " + connection.threadId);

        const searchWord = req.body.search
        console.log(req.body.search);

        //User the connection
        connection.query('SELECT * FROM customer_data WHERE email LIKE ?', ['%' + searchWord + '%'], (err, rows) => {

          //when done with connection, send the data
          connection.release();
          if (!err) {

            //Page rendering
            res.render('home', { rows });
          } else {
            console.log(err);
          }
          console.log(`Data from customer_data ${JSON.stringify(rows)}`);
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Rendering add customer page
  static addRenderPage = (req, res) => {
    try {
      res.render('add_customer');
    } catch (error) {
      console.log(error)
    }
  }

  //Add new customer
  static addCustomer = (req, res) => {
    try {
      const { name, email, phone } = req.body;

      pool.getConnection((err, connection) => {
        if (err) throw err; //DB not successfully connected
        console.log("DB successfully connected with ID " + connection.threadId);

        //User the connection
        connection.query(`INSERT INTO customer_data SET name = ?, email = ?, phone = ?`, [name, email, phone], (err, rows) => {

          //when done with connection, send the data
          connection.release();
          if (!err) {

            //Page rendering
            res.render('add_customer', { alert: "Customer added successfully" });
          } else {
            console.log(err);
          }
          // console.log(`Data from customer_data ${JSON.stringify(rows)}`);
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Rendering update page by populating data with ID
  static updateRenderPage = (req, res) => {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err; //DB not successfully connected
        console.log("DB successfully connected with ID " + connection.threadId);

        //User the connection
        connection.query('SELECT * FROM customer_data WHERE id = ?', [req.params.id], (err, rows) => {

          //when done with connection, send the data
          connection.release();
          if (!err) {

            //Page rendering
            res.render('edit_customer', { rows });
          } else {
            console.log(err);
          }
          // console.log(`Data from customer_data ${JSON.stringify(rows)}`);
        })
      });
    } catch (error) {
      console.log(error)
    }
  };

  // Updating data in in mysql database
  static updateCustomer = (req, res) => {
    try {
      const { name, email, phone } = req.body;

      pool.getConnection((err, connection) => {
        if (err) throw err; //DB not successfully connected
        console.log("DB successfully connected with ID " + connection.threadId);

        //User the connection
        connection.query('UPDATE customer_data SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, req.params.id], (err, rows) => {

          //when done with connection, send the data
          connection.release();
          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err; //DB not successfully connected
              console.log("DB successfully connected with ID " + connection.threadId);

              //User the connection
              connection.query('SELECT * FROM customer_data WHERE id = ?', [req.params.id], (err, rows) => {

                //when done with connection, send the data
                connection.release();
                if (!err) {

                  //Page rendering
                  res.render('edit_customer', { rows, alert: "Customer updated successfully" });
                } else {
                  console.log(err);
                }
              })
            });
          } else {
            console.log(err);
          }
        })
      });
    } catch (error) {
      console.log(error)
    }
  };

  static deleteCustomer = (req, res) => {
    try {
      pool.getConnection((err, connection) => {
        if (err) throw err; //DB not successfully connected
        console.log("DB successfully connected with ID " + connection.threadId);

        //User the connection
        connection.query('DELETE FROM customer_data WHERE id = ?', [req.params.id], (err, rows) => {

          //when done with connection, send the data
          connection.release();
          if (!err) {

            //Page redirect
            res.redirect('/?removed=' + encodeURIComponent("deleted successfully"));
          } else {
            console.log(err);
          }
        })
      });
    } catch (error) {
      console.log(error)
    }
  }
};

export default customerController;