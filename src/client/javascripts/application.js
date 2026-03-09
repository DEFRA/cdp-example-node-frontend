import {
  initAll,
  createAll,
  Button,
  Checkboxes,
  ErrorSummary,
  Header,
  Radios,
  SkipLink,
} from 'govuk-frontend'

import { banner } from '../../server/common/components/banner/banner.js'
import { reveal } from '../common/helpers/reveal.js'
import { initModule } from '../common/helpers/init-module.js'

import '../stylesheets/application.scss'


initAll()

createAll(Button)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(Header)
createAll(Radios)
createAll(SkipLink)







initAll()

// Notification banner
initModule('app-notification', banner)

// Reveal
initModule('app-reveal', reveal)
