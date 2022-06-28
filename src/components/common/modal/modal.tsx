import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';

type ModalProps = {
  open?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  variant?: 'center' | 'bottom';
};

const Modal: FC<ModalProps> = ({
  children,
  open,
  onClose,
  variant = 'center',
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto"
        onClose={onClose}
      >
        <div
          className={cn('min-h-screen lg:px-4 text-center', {
            'flex justify-center items-end': variant === 'bottom',
          })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-brand-dark/70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className={cn({
              'h-screen align-middle inline-block': variant === 'center',
              'h-screen align-bottom': variant === 'bottom',
            })}
            aria-hidden="true"
          >
            &#8203;
          </span>

          {variant === 'bottom' ? (
            <Transition.Child
              as={Fragment}
              enter="transition-top ease-linear duration-500"
              enterFrom="top-[100vh]"
              enterTo="top-0"
              leave="transition-top ease-out duration-500"
              leaveFrom="top-0"
              leaveTo="top-[100vh]"
            >
              <div className="w-full md:w-[500px] xl:w-auto inline-block p-0 ltr:text-left rtl:text-right align-middle transition-all shadow-xl relative z-50 h-[75vh] overflow-hidden">
                <div className="relative h-full">
                  <button
                    onClick={onClose}
                    aria-label="Close panel"
                    className="absolute opacity-0 top-2 md:top-4 ltr:right-2 rtl:left-2 md:ltr:right-4 md:rtl:left-4"
                  />
                  {children}
                </div>
              </div>
            </Transition.Child>
          ) : (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-110"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-110"
            >
              <div className="relative z-50 inline-block w-full p-4 overflow-hidden align-middle transition-all transform md:w-auto md:p-6 xl:p-8 ltr:text-left rtl:text-right">
                <div className="relative rounded-md">
                  <button
                    onClick={onClose}
                    aria-label="Close panel"
                    className="absolute opacity-0 top-2 md:top-4 ltr:right-2 rtl:left-2 md:ltr:right-4 md:rtl:left-4"
                  />
                  {children}
                </div>
              </div>
            </Transition.Child>
          )}
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
