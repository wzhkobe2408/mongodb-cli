const mongoose = require('mongoose')

// Map Global Promise
mongoose.Promise = global.Promise;

// Connect to DB
mongoose.connect('mongodb://localhost:27017/customercli',{
    useNewUrlParser: true
});

class CustomerService {

    // Constructor
    constructor() {
        this.Customer = require('./models/customer');
        this.db = mongoose.connection;
    }

    // Add Customer
    addCustomer(customer) {
        this.Customer.create(customer)
            .then(customer => {
                console.info('New Customer Added');
                this.db.close()
            })
            .catch(err => {
                console.info('Something went wrong');
                this.db.close()
            });
    }


    // Find Customer
    findCustomer(name) {
        // Make case insensitive
        const search = new RegExp(name, 'i');
        this.Customer.find({
            $or: [
                { firstname: search},
                { lastname: search }
            ]
        })
        .then(customer => {
            console.info(customer);
            console.info(`${customer.length} matches`);
            this.db.close()
        })
        .catch(err => {
            console.info('Something went wrong');
            this.db.close()
        });;
    }

    // Update Customer
    updateCustomer(_id, customer) {
        this.Customer.updateOne({ _id }, customer)
            .then(customer => {
                console.info('Customer updated')
                this.db.close()
            })
            .catch(err => {
                console.info('Something went wrong');
                this.db.close()
            })
    }

    // Remove Customer
    removeCustomer(_id) {
        this.Customer.remove({ _id })
            .then(customer => {
                console.info('Customer removed')
                this.db.close()
            })
            .catch(err => {
                console.info('Something went wrong');
                this.db.close()
            })
    }

    // List Customers
    listCustomers() {
        this.Customer.find()
            .then(customers => {
                console.info(customers);
                console.info(`${customers.length} customers`);
                this.db.close()
            })
            .catch(err => {
                console.info('Something went wrong');
                this.db.close()
            })
    }
}

module.exports = new CustomerService();