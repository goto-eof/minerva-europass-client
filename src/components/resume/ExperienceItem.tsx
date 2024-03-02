import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';
import ExperienceItemDTO from '../../dto/resume/ExperienceItemDTO';
import DateUtil from '../../util/DateUtil';
import GenericList from './GenericList';

export default function ExperienceItem({
  experience,
}: {
  experience: ExperienceItemDTO;
}) {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel htmlFor="birthDate">Date from</FormLabel>
          <Input
            id="dateFrom"
            value={DateUtil.dateToString(experience?.dateFrom)}
            size="md"
            type="date"
            readOnly
          />
        </FormControl>{' '}
        <FormControl>
          <FormLabel htmlFor="birthDate">Date to</FormLabel>
          <Input
            id="dateTo"
            value={DateUtil.dateToString(experience?.dateTo)}
            size="md"
            type="date"
            readOnly
          />
        </FormControl>
      </SimpleGrid>
      <FormControl>
        <FormLabel htmlFor="jobTitle">Job title</FormLabel>
        <Input readOnly value={experience.jobTitle} id="jobTitles" />
        <FormHelperText>
          Insert experience job title, like back-end software developer
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="mainActivities">Main activities</FormLabel>
        <Input readOnly value={experience.mainActivities} id="mainActivities" />
        <FormHelperText>
          ex. software implementation and unit test
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea readOnly value={experience.description} id="description" />
        <FormHelperText>project description</FormHelperText>
      </FormControl>
      <GenericList
        key={'back-end_' + experience.dateFrom}
        title="Back end technologies"
        readOnly={true}
        list={experience.backEndTechnologyList}
      />
      <GenericList
        key={'front-end_' + experience.dateFrom}
        title="Front end technologies"
        readOnly={true}
        list={experience.frontEndTechnologyList}
      />
      <GenericList
        key={'tools_' + experience.dateFrom}
        title="Tools"
        readOnly={true}
        list={experience.toolList}
      />
      <FormControl>
        <FormLabel htmlFor="workingMethodology">Working methodology</FormLabel>
        <Textarea
          readOnly
          value={experience.workingMethodology}
          id="workingMethodology"
        />
        <FormHelperText>Working methodology</FormHelperText>
      </FormControl>
      <SimpleGrid columns={{ base: 1, md: 2 }}></SimpleGrid>
    </Box>
  );
}
