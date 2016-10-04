
import {firebaseConfig} from "./src/environments/firebase.config";
import {initializeApp, auth,database} from 'firebase';


console.log('Running batch server ...');

initializeApp(firebaseConfig);


auth()
    .signInWithEmailAndPassword('admin@angular-university.io', 'test123')
    .then(runConsumer)
    .catch(onError);

function onError(err) {
    console.error("Could not login", err);
    process.exit();
}

function runConsumer() {
    console.log("Running consumer ...");

    var Queue = require('firebase-queue');
    var queueRef = database().ref('queue');

    var lessonsRef = database().ref("lessons");
    var lessonsPerCourseRef = database().ref("lessonsPerCourse");


    var queue = new Queue(queueRef, function(data, progress, resolve, reject) {

        console.log('received delete request ...',data);

        const deleteLessonPromise = lessonsRef.child(data.lessonId).remove();

        const deleteLessonPerCourseRef = lessonsPerCourseRef.child(data.courseId + '/' + data.lessonId).remove();

        Promise.all([deleteLessonPromise, deleteLessonPerCourseRef])
            .then(
                function() {
                    console.log("lesson deleted");
                    resolve();
                }
            ).catch(function() {
            console.log("lesson deletion in error");
            reject();
        });

    });

}




