import { useField } from "formik";

const CustomSelect = ({label, values, ...props}) => {
    const [field, meta] = useField(props);

    const options = values.map(({id, filter, filterValue}) => {
        return <option key={id} value={filterValue}>{filter}</option>
    });


    return (
        <>
            <div className="mb-3">
                <label htmlFor={props.name} className="form-label">{label}</label>
                <select 
                    className="form-select"
                    {...field}
                    {...props}
                    >
                    <option value=''>Я владею элементом...</option>
                    {options}
                </select>
            </div>
            {meta.touched && meta.error ? (
                <div className="error" style={{color: 'red'}}><em>{meta.error}</em></div>
            ) : null}
        </>
    )
}

export default CustomSelect;