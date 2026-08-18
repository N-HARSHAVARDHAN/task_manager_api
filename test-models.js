const { User, Task } = require('./models');

async function test() {

    try {

        console.log("User model:", User.name);
        console.log("Task model:", Task.name);

        console.log(
            "User associations:",
            Object.keys(User.associations)
        );

        console.log(
            "Task associations:",
            Object.keys(Task.associations)
        );

    } catch (error) {

        console.error(error);

    }

}

test();