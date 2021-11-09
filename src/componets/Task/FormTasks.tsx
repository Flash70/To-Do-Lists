import {Field, Form, Formik} from "formik"
import React from "react"
import style from "../../pages/Tasks/Tasks.module.scss"
import {FormType} from "./AddNewTask"
import * as Yup from 'yup'


interface INewTaskProps {
    title?: string
    closeNewTask: React.MouseEventHandler<HTMLButtonElement>
    onSubmit: (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => void
}

export const FormTasks: React.FC<INewTaskProps> = ({closeNewTask, onSubmit, title}) => {
    const signupSchema = Yup.object().shape({
        task: Yup.string()
            .min(2, 'Минимальная длина 2 символа')
            .max(100, 'Максимальная длина 100 символов')
            .required('Required')
    })

  return (
      <div className={style.addTask}>
          <Formik initialValues={{task: title || ""}} onSubmit={onSubmit} validationSchema={signupSchema}>
              {({isSubmitting, errors, touched}) => (
                  <Form>
                      <Field autoFocus={true} type={"text"} name={"task"}/>
                      <div>
                          {errors.task && touched.task ? <div style={{color: "#E82B26",}}>{errors.task}</div> : null}
                      </div>
                      <div>
                          <button type="submit" disabled={isSubmitting}>Добавить задачу</button>
                          <button onClick={closeNewTask}>Отмена</button>
                      </div>
                  </Form>
              )}
          </Formik>
      </div>
  )
}