import React from 'react'
import { Section, ValueGroup } from '@adminjs/design-system'
import { convertToSubProperty, BasePropertyComponent, flat } from 'adminjs'


const Comment = (props) => {
  const { property, record } = props
  const items = flat.get(record.params, 'comments')
  return (
    <div>
      <ValueGroup label={'Comments'}>
        <Section>
          {(items || []).map((item, i) => {
            const itemProperty = convertToSubProperty(property, i)
            return (
              <BasePropertyComponent
                {...this.props}
                key={itemProperty.path}
                property={itemProperty}
              />
            )
          })}
        </Section>
      </ValueGroup>    
      </div>
  )
}

export default Comment
