import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { DrawerContent, Box, DrawerFooter, Button, Icon } from '@adminjs/design-system'


import {ActionHeader,useRecord,useTranslation,LayoutElementRenderer,BasePropertyComponent} from 'adminjs'

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
  const history = useHistory()
  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord)
    }
  }, [initialRecord])

  const submit = (event) => {
    event.preventDefault()
    handleSubmit().then((response) => {
      if (response.data.redirectUrl) {
        history.push(
          response.data.redirectUrl,
          { previousPage: window.location.href },
        )
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
        {action?.showInDrawer ? <ActionHeader {...props} /> : null}
        {action.layout ? action.layout.map((layoutElement, i) => (
          <LayoutElementRenderer
            key={i}
            layoutElement={layoutElement}
            {...props}
            where="edit"
            onChange={handleChange}
            record={record }
          />
        )) : resource.editProperties.map(property =>{ 
            if(property.propertyPath === 'status') return;
          
          return (
            <BasePropertyComponent
            key={property.propertyPath}
            where="edit"
            onChange={handleChange}
            property={property}
            resource={resource}
            record={record}
          />
        )})}
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary" size="lg" type="submit" data-testid="button-save" disabled={loading}>
          {loading ? (<Icon icon="Fade" spin />) : null}
          {translateButton('save', resource.id)}
        </Button>
      </DrawerFooter>
    </Box>
  )
}

export {
  New as default,
  New,
}
