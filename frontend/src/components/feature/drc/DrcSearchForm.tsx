import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { DrcMainSearchParams } from '@/types/drc'

interface DrcSearchFormProps {
  initialParams: DrcMainSearchParams
  onSearch: (params: DrcMainSearchParams) => void
  isLoading?: boolean
}

export function DrcSearchForm({ initialParams, onSearch, isLoading }: DrcSearchFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<DrcMainSearchParams>({
    defaultValues: initialParams
  })
  
  const onSubmit = (data: DrcMainSearchParams) => {
    onSearch(data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          시작일자
        </label>
        <Input
          type="date"
          {...register('startDate')}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          종료일자
        </label>
        <Input
          type="date"
          {...register('endDate')}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          회사구분
        </label>
        <Select onValueChange={(value) => setValue('companyType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            <SelectItem value="1">일반</SelectItem>
            <SelectItem value="2">간이</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상태코드
        </label>
        <Select onValueChange={(value) => setValue('statusCode', value)}>
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            <SelectItem value="PENDING">대기</SelectItem>
            <SelectItem value="PROCESSING">처리중</SelectItem>
            <SelectItem value="COMPLETED">완료</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="lg:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          검색키워드
        </label>
        <div className="flex space-x-2">
          <Input
            {...register('keyword')}
            placeholder="회사명, 사업자번호 등"
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="px-6"
          >
            {isLoading ? '검색중...' : '검색'}
          </Button>
        </div>
      </div>
    </form>
  )
}
