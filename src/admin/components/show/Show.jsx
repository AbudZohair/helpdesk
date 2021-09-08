import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import { DrawerContent, ValueGroup, Section, Text, TextArea, Button, DrawerFooter, Box } from '@adminjs/design-system'
import { BasePropertyComponent, useCurrentAdmin, ApiClient, useRecord, ActionHeader } from 'adminjs'

const api = new ApiClient();


const Show = (props) => {
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin()
  const [commentsRecords, setCommentsRecords] = useState([])
  const [reply, setReply] = useState('')
  const history = useHistory()

  const { resource, record: initialRecord, action } = props


  const properties = resource.showProperties

  useEffect(() => {
    api.resourceAction({ resourceId: 'Comment', actionName: 'list', params: { 'filters.ticket': `${initialRecord.id}` } }).then(results => setCommentsRecords(results.data.records))
  }, []);


  const submit = (e) => {
    e.preventDefault();
    api.resourceAction({ resourceId: 'Comment', actionName: 'new', data: { body: reply, author: currentAdmin._id, ticket: initialRecord.id } }).then(response => {
      if (response.data.redirectUrl) {

        history.push('/admin/resources/Ticket', {
          previousPage: window.location.href,
        })
      }
    })

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

        {properties.map(property => {

          return (
            <>

              <BasePropertyComponent
                key={property.propertyPath}
                where="show"
                property={property}
                resource={resource}
                record={initialRecord}
              />

            </>
          )
        })}

        {commentsRecords && commentsRecords.length > 0 && <ValueGroup label={'Replies'}>

          {
            commentsRecords.map(record => (
              <Section key={record.id}>
                <Text fontWeight="bolder" variant="lg">{record.populated.author.title}</Text>
                <Text variant="sm">{record.params.createdAt}</Text>
                <Section border="">
                  <Text >{record.params.body}</Text>
                </Section>
              </Section>

            ))
          }
        </ValueGroup>
        }

        {action && action.name === 'addReply' && <TextArea width={1} value={reply} onChange={(e) => setReply(e.target.value)} />
        }

      </DrawerContent>

      {action && action.name === 'addReply' && <DrawerFooter>
        <Button variant="primary" size="lg" type="submit">
          Add Reply
        </Button>
      </DrawerFooter>
      }
    </Box>
  )
}

export {
  Show as default,
  Show,
}
