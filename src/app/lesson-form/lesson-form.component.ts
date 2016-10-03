import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateUrl} from "../shared/validators/validateUrl";
@Component({
  selector: 'lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit {

    form:FormGroup;

    constructor(private fb:FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            description: ['',Validators.required],
            url: ['',Validators.required],
            videoUrl: ['',[Validators.required, validateUrl]],
            tags: ['',Validators.required],
            longDescription: ['']
        });

    }

    isErrorVisible(field:string, error:string) {

        return this.form.controls[field].dirty
                && this.form.controls[field].errors &&
                this.form.controls[field].errors[error];

    }


    reset() {
        this.form.reset();
    }


    get valid() {
        return this.form.valid;
    }

    get value() {
        return this.form.value;
    }

}
