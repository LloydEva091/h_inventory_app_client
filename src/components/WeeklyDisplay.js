import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'


const WeeklyDisplay = ({ props }) => {

  // Extract the labels and data values from the passed in data
  const breakfast = props.map(({ breakfast }) => breakfast).flat();
  const lunch = props.map(({ lunch }) => lunch).flat();
  const dinner = props.map(({ dinner }) => dinner).flat();

  const content = (
    <>
      {props.map(day => (
        <div className='mx-auto w-full max-w-md bg-white p-2.5 m-4 rounded-md'>
          <div className='h-10 w-full'>
            <span className='flex py-2 text-purple-900 font-bold pointer-events-none uppercase justify-center'>{day.day}</span>
          </div>

          {/* Breakfast */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Breakfast</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <ul className='px-4'>
                    {day.breakfast.map(item => <li className='hover:text-teal-700' key={item}>{item}</li>)}
                  </ul>

                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/* Lunch */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Lunch</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <ul className='px-4'>
                  {day.lunch.map(item => <li className='hover:text-teal-700' key={item}>{item}</li>)}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          {/* Dinner */}
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Dinner</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <ul className='px-4'>
                  {day.dinner.map(item => <li className='hover:text-teal-700' key={item}>{item}</li>)}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </>

  )

  return content
}

export default WeeklyDisplay