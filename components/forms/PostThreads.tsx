"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { usePathname, useRouter } from "next/navigation"
import { ThreadValidation } from "@/lib/validations/thread"
import { Textarea } from "../ui/textarea"
import { createThread } from "@/lib/actions/thread.actions"
import { useOrganization } from "@clerk/nextjs"

interface Props{
 userId: string
}


const PostThreads = ({ userId }: Props) => {

    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof ThreadValidation>>({
      resolver: zodResolver(ThreadValidation),
      defaultValues: {
        thread: "",
        accountId: userId,
      },
    })
    
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
         text: values.thread,
         author: userId,
         communityId: organization ? organization.id : null,
         path: pathname,
        })
        
        router.push("/")
    }
    return (
        <Form {...form}>
          <form
            className='mt-10 flex flex-col justify-start gap-10'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='thread'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                  <FormLabel className='text-base-semibold text-light-2'>
                    Create Thread
                  </FormLabel>
                  <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                    <Textarea rows={15} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <Button type='submit' className='bg-primary-500'>
              Post Thread
            </Button>
          </form>
        </Form>
      );
}

export default PostThreads