import {Subject} from "rxjs/Rx";

export default function firebaseUpdate(dbRef, data) {

    const subject = new Subject();

    debugger;

    dbRef.update(data)
        .then(
            val => {
                subject.next(val);
                subject.complete();
            },
            err => {
                subject.error(err);
                subject.complete();
            }
        );

    return subject.asObservable();

}