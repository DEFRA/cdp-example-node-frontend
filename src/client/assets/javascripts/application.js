import { initAll } from 'govuk-frontend'

import { initModule } from '~/src/client/common/helpers/init-module'
import { banner } from '~/src/server/common/components/banner/banner'
import { reveal } from '~/src/client/common/helpers/reveal'

import '../stylesheets/application.scss'

import '../images/favicon.ico'
import '../images/favicon.svg'
import '../images/govuk-icon-180.png'
import '../images/govuk-icon-192.png'
import '../images/govuk-icon-512.png'
import '../images/govuk-icon-mask.svg'

initAll()

// Notification banner
initModule('app-notification', banner)

// Reveal
initModule('app-reveal', reveal)
