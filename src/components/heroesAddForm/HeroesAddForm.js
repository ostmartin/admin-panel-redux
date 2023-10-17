import { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { useCreateHeroMutation } from '../../api/apiSlice';
import CustomField from './CustomField';
import CustomSelect from './CustomSelect';
import { selectAll } from '../heroesFilters/filtersSlice';
//eslint-disable-next-line
import store from '../../store';

const HeroesAddForm = () => {
    // const filters = selectAll(store.getState());
    const filters = useSelector(selectAll);

    const [createHero] = useCreateHeroMutation();

    const onCreateHero = useCallback((values, actions) => {
        const hero = {
            id: uuidv4(),
            ...values
        }
        
        createHero(hero);

        actions.resetForm();
        // eslint-disable-next-line
    }, [])

    return (
        <Formik
        initialValues={{
            name: '',
            description: '',
            element: ''
        }}
        validationSchema={Yup.object({
            name: Yup.string().required('Даже у Безимянного есть имя ;)'),
            description: Yup.string().required('Совсем немного о героее...'),
            element: Yup.string().required('Выберите стихию')
        })}
        onSubmit={(values, actions) => onCreateHero(values, actions)}
        >
            <Form className="border p-4 shadow-lg rounded">
                <CustomField
                    elem='input'
                    label='Имя нового героя'
                    name='name'
                    id='name'
                    placeholder='Как меня зовут?'
                />
                <CustomField
                    elem='textarea'
                    label='Описание'
                    name='description'
                    id='text'
                    placeholder='Что я умею?'
                    style={{"height": '130px'}}
                />
                <CustomSelect
                    label='Выбрать элемент героя'
                    name='element'
                    id='element'
                    values={filters}
                />
                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;