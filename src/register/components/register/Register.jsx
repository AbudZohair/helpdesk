import React, { useEffect } from 'react'
import { DrawerContent, Box, DrawerFooter, Button, Icon } from '@adminjs/design-system'
import {BasePropertyComponent,LayoutElementRenderer, useRecord , useTranslation } from 'adminjs'
const New = (props) => {
  const { record: initialRecord, resource, action } = props
  const {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    setRecord,
  } = useRecord(initialRecord, resource.id)
  const { translateButton } = useTranslation()
  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord)
    }
  }, [initialRecord])

  const submit = (event) => {
    event.preventDefault()
    handleSubmit().then((response) => {
      if (response.data.redirectUrl) {
        window.location.assign(response.data.redirectUrl)
      }
      if (response.data.record.id && !Object.keys(response.data.record.errors).length) {
        handleChange({ params: {}, populated: {}, errors: {} })
      }
    })
    return false
  }

  return (
    <Box
      as="form"
      onSubmit={submit}
      flex
      flexGrow={1}
      flexDirection="column"
    >
      <DrawerContent>
        {action.layout ? action.layout.map((layoutElement, i) => (
          <LayoutElementRenderer
            key={i}
            layoutElement={layoutElement}
            {...props}
            where="edit"
            onChange={handleChange}
            record={record}
          />
        )) : resource.editProperties.map(property => (
          <BasePropertyComponent
            key={property.propertyPath}
            where="edit"
            onChange={handleChange}
            property={property}
            resource={resource}
            record={record}
          />
        ))}
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary" size="lg" type="submit" X disabled={loading}>
          {loading ? (<Icon icon="Fade" spin />) : null}
          {translateButton('Create New Account', resource.id)}
        </Button>
      </DrawerFooter>
    </Box>
  )
}

export default New