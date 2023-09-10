'use client'

import { Button } from '@/components/ui/button';
import { PhoneNumberClickLog } from '@/interfaces/phone-number-click-log';
import { TableNames } from '@/utilities/database.types';
import { createFingerprint, retrieveUserAgentDevice } from '@/utilities/navigator';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

interface CopyButtonProps {
  value: string;
}

export default function CopyButton({value}: CopyButtonProps) {
  const [ isCopied, setIsCopied ] = useState<boolean>(false);

  const copied = async () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    await logCopy();
  }

  const logCopy = async () => {
    const log: PhoneNumberClickLog = {
      device: retrieveUserAgentDevice(navigator.userAgent),
      fingerprint: await createFingerprint()
    };
    const supabase = createClientComponentClient();

    await supabase
      .from(TableNames.PhoneNumberClickLog)
      .insert([
        log
      ]);
  }

  return (
    <Button
      className="py-2 px-0"
      variant="ghost"
      onClick={() => copied()}
    >
      <span className="text-md font-light tracking-light text-gray-650 sm:text-lg">
        {value}
      </span>
      {!isCopied && 
        <DocumentDuplicateIcon 
          className="w-5 h-5 ml-3 inline text-gray-650"
        />
      }
      {isCopied &&
        <CheckIcon
          className='w-5 h-5 ml-3 inline text-gray-650'
        />
      }
    </Button>
  );
}