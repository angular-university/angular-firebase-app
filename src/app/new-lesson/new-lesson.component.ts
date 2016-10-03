import { Component, OnInit } from '@angular/core';
import {LessonsService} from "../shared/model/lessons.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  courseId:string;

  constructor(private lessonsService: LessonsService,
                private route: ActivatedRoute) { }


  ngOnInit() {
      this.courseId = this.route.snapshot.queryParams['courseId'];
      console.log('course', this.courseId);
  }


    save(form) {
        this.lessonsService.createNewLesson(this.courseId, form.value)
            .subscribe(
                () => {
                    alert("lesson created succesfully. Create another lesson ?");
                    form.reset();
                },
                err => alert(`error creating lesson ${err}`)
            );

    }

}
