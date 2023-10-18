import { useFormikContext } from 'formik'
import { get } from 'lodash'
import React, { FC } from 'react'

export interface INestedFormData {
  dataPath: string;
  resourceName: string;
  DataRowComponent: any;
}

export const NestedForm: FC<INestedFormData> = (props) => {
  const {
    dataPath,
    DataRowComponent,
    resourceName,
  } = props

  const {
    values: formValues,
  } = useFormikContext()

  const data = get(formValues, dataPath)

  return (
    <>
      {data?.map((item, index) => {
        return (
          <DataRowComponent
            resourceName={resourceName}
            data={item}
            dataPath={`${dataPath}`}
            index={index}
            key={index}
          />
        )
      })}
    </>
  )
}
