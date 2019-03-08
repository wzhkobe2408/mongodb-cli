#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const CustomerServiceInstance = require('./index')
const questions = require('./config/customer-question')

/**
 * Introduction For CLI
 */
program
    .version('1.0.0')
    .description('Customer Management System')

/*
program
    .command('add <firstname> <lastname> <phone> <email>')
    .alias('a')
    .description('Add a customer')
    .action((firstname, lastname, phone, email) => {
        CustomerServiceInstance.addCustomer({
            firstname,
            lastname,
            phone,
            email
        })
    });
*/

/**
 * Add Customer
 */
program
    .command('add')
    .alias('a')
    .description('Add a customer')
    .action(() => {
        prompt(questions).then(answers => CustomerServiceInstance.addCustomer(answers));
    })


/**
 * Find Customer by Name
 */
program
    .command('find <name>')
    .alias('f')
    .description('Find customers by name')
    .action((name) => {
        CustomerServiceInstance.findCustomer(name)
    });

/**
 * Update Customer
 */
program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer')
    .action(_id => {
        prompt(questions).then(answers => CustomerServiceInstance.updateCustomer(_id, answers));
    })

/**
 * Remove Customer by ID
 */
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove customers by _id')
    .action(_id => {
        CustomerServiceInstance.removeCustomer(_id)
    });

/**
 * List Customers
 */
program
    .command('list')
    .alias('l')
    .description('List customers')
    .action(() => {
        CustomerServiceInstance.listCustomers()
    });

program.parse(process.argv);

